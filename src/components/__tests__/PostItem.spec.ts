import { shallowMount, VueWrapper } from '@vue/test-utils';
import PostItem from "@/components/posts/PostItem.vue";
import {beforeEach, describe, expect, it} from "vitest";
import type {PostItemPropType} from "@/types/Types";

const factory = (props: PostItemPropType) => {
    return shallowMount(PostItem, {
        props
    });
}

const defaultProps: PostItemPropType = {
    postId: 1,
    index: 1,
    showSortUp: true,
    showSortDown: true,
}

describe('PostItem.vue', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = factory(defaultProps)
    });

    it('matches the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders the postTitle correctly', () => {
        expect(wrapper.find('[data-test="postTitle"]').text()).toBe(`Post ${defaultProps.postId}`);
    });

    it('emits "onSortChange" event when sort buttons are clicked', async () => {
        await wrapper.find('[data-test="sortUp"]').trigger('click');
        expect(wrapper.emitted().onSortChange).toBeTruthy();
        expect(wrapper.emitted().onSortChange[0]).toEqual([{ postId: 1, fromIndex: 1, toIndex: 0 }]);

        await wrapper.find('[data-test="sortDown"]').trigger('click');
        expect(wrapper.emitted().onSortChange[1]).toEqual([{ postId: 1, fromIndex: 1, toIndex: 2 }]);
    });

    describe('when sort buttons', () => {

        it('should not render sortUp button when showSortUp is false', () => {

            wrapper = factory({...defaultProps, showSortUp: false});

            expect(wrapper.find('[data-test="sortUp"]').exists()).toBe(false);
        });

        it('should not render sortDown button when showSortDown is false', () => {

            wrapper = factory({...defaultProps, showSortDown: false});

            expect(wrapper.find('[data-test="sortDown"]').exists()).toBe(false);
        });

        it('should not render the element with sortUp and sortDown button when showSortUp and showSortDown is false', () => {

            wrapper = factory({...defaultProps, showSortDown: false, showSortUp: false});

            expect(wrapper.find('[data-test="sortButtons"]').exists()).toBe(false);
        });

    })
});
