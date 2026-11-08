import type { ContactFormData } from '@/types'

export const contactService = {
  /**
   * Submit contact form
   */
  async submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    // Simulate API network call delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log('[ContactService] Form submission received:', data)
    return {
      success: true,
      message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.',
    }
  },
}
