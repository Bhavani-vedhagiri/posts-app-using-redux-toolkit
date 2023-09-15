import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import lodash from "lodash";
import axios from "axios";

// const initialState = [
//   {
//     id: 1,
//     title: "Learn redux toolkit",
//     content: "It's easy",
//     timeStamp: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocke: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: 2,
//     title: "Subscribe...",
//     content: "Like and Share this video",
//     timeStamp: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocke: 0,
//       coffee: 0,
//     },
//   },
// ];

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //| 'loading' | 'succeeded' | 'failed',
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const resp = await axios.get(POST_URL);
  const uniqueArray = lodash.uniqBy(resp.data, 'userId');
  console.log(" fetchPosts Response",uniqueArray)
  return uniqueArray;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (param) => {
  const resp = await axios.post(POST_URL, param );
  return resp.data;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        // using this call back function for data structure :  prepare() to reducer()
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            timeStamp: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocke: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = lodash.find(state.posts, (post) => {
        return Number(post.id) === Number(postId);
      });
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }},
    extraReducers(builder) {
      // builder - its object, used to handle the promise response
      builder 
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = "successed";
          // adding timestamp and reaction
          let min = 1;
          const loadedPosts = action.payload.map(post => {
            post.timeStamp = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions =  {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocke: 0,
                    coffee: 0,
                  };
            return post;
          })
          //Added fetched post to array 
            state.posts = lodash.uniqBy(state.posts.concat(loadedPosts), 'userId') // value will be added to copy of post bcs of immesr concept
          })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          //sort the post and adding a new post in below all fetched posts
            const sortedNewPosts = state.posts.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
                action.payload.id = sortedNewPosts[sortedNewPosts.length - 1].id + 1;
                action.payload.userId = Number(action.payload.userId);
                action.payload.timeStamp = new Date().toISOString();
                action.payload.reactions = {
                  thumbsUp: 0,
                  wow: 0,
                  heart: 0,
                  rocke: 0,
                  coffee: 0,
                }
                console.log('Add users:',action.payload)
                state.posts.push(action.payload)
        })
    },
});
export const selectAllPost = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
