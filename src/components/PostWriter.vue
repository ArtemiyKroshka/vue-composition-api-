<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {TimelinePost} from "../posts";
import {useRouter} from "vue-router";
import {marked} from "marked";
import highlightjs from "highlight.js";
import {debounce} from "lodash";
import {usePosts} from "../stores/posts";

const props = defineProps<{
  post: TimelinePost;
}>();

const postsStore = usePosts();
const router = useRouter();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();
const contentHtml = ref();

function parseHtml(markdown: string): void {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        console.log(highlightjs.highlightAuto(code).value);
        return highlightjs.highlightAuto(code).value;
      },
    },
    (err, parseResult) => {
      if (err) {
        console.log(err);
      }
      contentHtml.value = parseResult;
    }
  );
}

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent);
  }, 250),
  {
    immediate: true,
  }
);

onMounted(() => {
  if (contentEditable.value) contentEditable.value.innerText = content.value;
});

function handleInput() {
  if (contentEditable.value) content.value = contentEditable.value?.innerText;
}

async function handleClick() {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: contentHtml.value,
  };
  await postsStore.createPost(newPost);
  router.push("/");
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post Title</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="contentHtml" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save post
      </button>
    </div>
  </div>
</template>
