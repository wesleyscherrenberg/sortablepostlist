import {shallowMount, VueWrapper} from '@vue/test-utils';
import {beforeEach, describe, expect, it} from "vitest";
import ActionItem from "@/components/posts/ActionItem.vue";
import type {ActionsType} from "@/types/Types";

const factory = () => {
    return shallowMount(ActionItem, {
        props:  {
            action: {
                postId: 1,
                fromIndex: 0,
                toIndex: 1
            } as ActionsType,
            btnText: 'Click',
        }
    });
}

describe('ActionItem.vue', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = factory();
    });

    it('matches the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders the text correctly', () => {

        expect(wrapper.find('[data-test="itemText"]').text()).toBe('Moved post 1 from index 0 to index 1')
    })

    it('emits an event when the button is clicked', async () => {

        await wrapper.find('[data-test="onTimeTravelBtn"]').trigger('click');

        expect(wrapper.emitted()).toHaveProperty('onTimeTravelChange');
        expect(wrapper.emitted().onTimeTravelChange[0]).toEqual([{
            postId: 1,
            fromIndex: 0,
            toIndex: 1
        }]);
    });

    it('renders btnText properly', () => {
        expect(wrapper.find('[data-test="onTimeTravelBtn"]').text()).toBe('Click');
    });
});
