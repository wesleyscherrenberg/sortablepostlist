import {mount, VueWrapper} from '@vue/test-utils'
import {beforeEach, describe, expect, it} from "vitest";
import Card from "@/components/card/Card.vue";

describe('Card', () => {

  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Card, {
      props: {
        title: 'Test Title'
      },
      slots: {
        default: 'Test slot content'
      }
    })
  })

  it('should render the correct title', () => {
    expect(wrapper.find('[data-test="title"]').text()).toStrictEqual('Test Title')
  })

  it('should render slot content', () => {
    expect(wrapper.find('[data-test="body"]').text()).toStrictEqual('Test slot content')
  })
})
