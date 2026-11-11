import type { CloudflareEnv, InquiryRecord } from './types'

const INQUIRIES_LIST_KEY = 'inquiries:list'
const MAX_LIST_ITEMS = 500

export async function listInquiries(env: CloudflareEnv): Promise<InquiryRecord[]> {
  if (!env.HTX_INQUIRIES) return []
  const data = (await env.HTX_INQUIRIES.get(INQUIRIES_LIST_KEY, 'json')) as InquiryRecord[] | null
  return Array.isArray(data) ? data : []
}

export async function saveInquiry(env: CloudflareEnv, record: InquiryRecord): Promise<void> {
  if (!env.HTX_INQUIRIES) {
    throw new Error('HTX_INQUIRIES KV namespace is not bound.')
  }

  const current = await listInquiries(env)
  const deduped = current.filter((item) => item.code !== record.code)
  const updated = [record, ...deduped].slice(0, MAX_LIST_ITEMS)

  await Promise.all([
    env.HTX_INQUIRIES.put(INQUIRIES_LIST_KEY, JSON.stringify(updated)),
    env.HTX_INQUIRIES.put(`inq:${record.code}`, JSON.stringify(record)),
  ])
}

export async function updateInquiryStatus(
  env: CloudflareEnv,
  code: string,
  status: InquiryRecord['status']
): Promise<boolean> {
  if (!env.HTX_INQUIRIES) return false
  const current = await listInquiries(env)
  let found = false
  const updated = current.map((item) => {
    if (item.code === code) {
      found = true
      return { ...item, status }
    }
    return item
  })

  if (!found) return false

  const targetItem = updated.find((i) => i.code === code)
  await Promise.all([
    env.HTX_INQUIRIES.put(INQUIRIES_LIST_KEY, JSON.stringify(updated)),
    targetItem ? env.HTX_INQUIRIES.put(`inq:${code}`, JSON.stringify(targetItem)) : Promise.resolve(),
  ])
  return true
}

export async function deleteInquiry(env: CloudflareEnv, code: string): Promise<boolean> {
  if (!env.HTX_INQUIRIES) return false
  const current = await listInquiries(env)
  const filtered = current.filter((item) => item.code !== code)
  if (filtered.length === current.length) return false

  await Promise.all([
    env.HTX_INQUIRIES.put(INQUIRIES_LIST_KEY, JSON.stringify(filtered)),
    env.HTX_INQUIRIES.delete(`inq:${code}`),
  ])
  return true
}
