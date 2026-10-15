import { defineComponent, h, ref, Suspense } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import MerchantHero from './MerchantHero.vue'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('MerchantHero', () => {
  it('renders the merchant image from the public images folder', async () => {
    vi.stubGlobal('useAsyncData', async () => ({
      data: ref({
        title: 'Provisões para grandes jornadas',
        description: 'Bem-vindo, aventureiro. Veja minhas mercadorias.',
        image: {
          source: '/images/simple-merchant.png',
          alt: 'Um mercador de fantasia pronto para atender aventureiros.'
        }
      })
    }))

    const wrapper = mount(defineComponent({
      setup: () => () => h(Suspense, null, {
        default: () => h(MerchantHero),
        fallback: () => h('div')
      })
    }), {
      global: {
        stubs: {
          UPageHero: defineComponent({
            props: ['title', 'description', 'orientation', 'reverse'],
            setup: (props, { slots }) => () => h('section', {
              'data-orientation': props.orientation,
              'data-reverse': String(props.reverse)
            }, [
              h('h1', props.title as string),
              h('p', props.description as string),
              slots.default?.()
            ])
          })
        }
      }
    })
    await flushPromises()
    const image = wrapper.get('img')

    expect(image.attributes('src')).toBe('/images/simple-merchant.png')
    expect(image.attributes('alt')).toBe('Um mercador de fantasia pronto para atender aventureiros.')
    expect(wrapper.get('h1').text()).toBe('Provisões para grandes jornadas')
    expect(wrapper.get('p').text()).toBe('Bem-vindo, aventureiro. Veja minhas mercadorias.')
    expect(wrapper.get('section').attributes('data-orientation')).toBe('vertical')
    expect(wrapper.get('section').attributes('data-reverse')).toBe('true')
  })
})
