import {shallowMount, VueWrapper} from '@vue/test-utils'
import {fetchPosts} from "@/services/apiService.js";
import {beforeAll, beforeEach, describe, expect, it, vi} from "vitest";
import Posts from "@/components/posts/Posts.vue";
import ActionItem from "@/components/posts/ActionItem.vue";
import type {ActionsType} from "@/types/Types";
import {ActionListStub, CardStub, NotificationStub, PostItemStub, PostStub, ToastStub} from "./stubs";

const mocks = vi.hoisted(() => {
    return {
        fetchPosts: vi.fn().mockResolvedValue(
            Array.from({length: 100}, (_, i) => ({
                userId: i + 1,
                id: i + 1,
                title: "title",
                body: "body"
            }))
        ),
    }
})

vi.mock('@/services/apiService', () => ({
    fetchPosts: mocks.fetchPosts,
}));

const factory = () => {
    return shallowMount(Posts, {
        props: {
            limit: 5
        },
        global: {
            stubs: {
                Post: PostStub,
                Card: CardStub,
                PostItem: PostItemStub,
                ActionItem: ActionItem,
                ActionList: ActionListStub,
                Toast: ToastStub,
                Notification: NotificationStub

            }
        }
    });
}

const sortCases = [
    {
        postId: 2,
        fromIndex: 1,
        toIndex: 2
    },
    {
        postId: 4,
        fromIndex: 3,
        toIndex: 4
    },
    {
        postId: 3,
        fromIndex: 1,
        toIndex: 0
    }
]

describe('Posts.vue', () => {

    let wrapper: VueWrapper;

    beforeAll( () => {
        wrapper = factory();
    });

    describe('When the component renders', () => {

        it('matches the snapshot', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should have postItems', () => {
            expect(fetchPosts).toHaveBeenCalled()

            expect(wrapper.findAllComponents(PostItemStub).length).toBe(5);
        })

        it('Toast message and variant attributes should have data', () => {

            expect(wrapper.findComponent(ToastStub).attributes('message'))
                .toEqual(`Hello! I have provided 5 posts for you to sort.`);

            expect(wrapper.findComponent(ToastStub).attributes('variant'))
                .toEqual('info');
        })

    })

    describe.each(sortCases)('when sorting post List', (action: ActionsType) => {

        const { fromIndex, toIndex, postId} = action
        const sortCaseIndex = sortCases.indexOf(action);

        it(`Move post ${postId} from index ${fromIndex} to index ${toIndex}`, async () => {

            const postItem = wrapper.findAllComponents(PostItemStub)[fromIndex];
            await postItem.vm.$emit('onSortChange', action);

            expect(wrapper.findAllComponents(PostItemStub)[toIndex].attributes('postid'))
                .toEqual(postId.toString());

        })

        it(`Action item should have text Moved post ${postId} from index ${fromIndex} to index ${toIndex} action`, () => {
            const reverseIndex = wrapper.findAllComponents(ActionItem).length - sortCaseIndex - 1;
            const actionItemComponent = wrapper.findAllComponents(ActionItem)[reverseIndex];
            expect(actionItemComponent.find('[data-test="itemText"]').text())
                .toEqual(`Moved post ${postId} from index ${fromIndex} to index ${toIndex}`);
        })

        it(`There should be ${sortCaseIndex + 1} list of action items committed`, () => {
            expect(wrapper.findAllComponents(ActionItem).length).toBe(sortCaseIndex + 1);
        })

        it('matches the snapshot', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

    })

    describe('When Time Travel on the second action card', () => {

        beforeAll(async () => {
            const actionItemComponent = wrapper.findAllComponents(ActionItem)[1]
            await actionItemComponent.find('[data-test="onTimeTravelBtn"]').trigger('click')
        })

        it('should only have 1 action item left', () => {
            expect(wrapper.findAllComponents(ActionItem)).toHaveLength(1)
        })

        it('Action item should only have text Moved post 2 from index 1 to index 2 action', () => {
            const actionItemComponent = wrapper.findAllComponents(ActionItem)[0];
            expect(actionItemComponent.find('[data-test="itemText"]').text()).toEqual('Moved post 2 from index 1 to index 2');
        })

        it('Post list should match Post 1,3,2,4,5', () => {

            const postItems = wrapper.findAllComponents(PostItemStub);
            const postIds = [1, 3, 2, 4, 5];

            postIds.forEach((postId, index) => {
                expect(postItems[index].attributes('postid')).toEqual(postId.toString());
            });
        })


    })

    describe('When there are no posts', () => {

        beforeEach( () => {
            mocks.fetchPosts.mockResolvedValue([])
            wrapper = factory()
        })

        it('should show the postNotification', () => {
            expect(wrapper.findComponent(NotificationStub).exists()).toBe(true);
            expect(wrapper.findComponent(NotificationStub).attributes('icon')).toEqual('sad');
            expect(wrapper.findComponent(NotificationStub).attributes('text')).toEqual('There a no post available at this moment');
        });
    })

    describe('When fails with exception', () => {

        beforeEach( () => {
            mocks.fetchPosts.mockRejectedValue(new Error('Async error'))
            wrapper = factory()
        })

        it('should show error toast when fetchPosts fails', async () => {
            expect(wrapper.findComponent(ToastStub).attributes('message')).toEqual('Async error');
            expect(wrapper.findComponent(ToastStub).attributes('variant')).toEqual('error');
        });

    })
})
