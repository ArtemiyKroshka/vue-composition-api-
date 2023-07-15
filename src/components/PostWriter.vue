<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {Post, TimelinePost} from "../posts";
import {marked} from "marked";
import highlightjs from "highlight.js";
import {debounce} from "lodash";
import { useUsers } from "../stores/users";

const props = defineProps<{
  post: TimelinePost | Post;
}>();

const emit = defineEmits<{
(event: 'submit', post: Post): void;
}>();

const userStore = useUsers();

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
  if(!userStore.currentUserId) {
    throw Error('User was not found')
  }
  const newPost: Post = {
    ...props.post,
    created:  typeof props.post.created === 'string' ? props.post.created : props.post.created.toISO(),
    title: title.value,
    authorId: userStore.currentUserId,
    markdown: content.value,
    html: contentHtml.value,
  };
  emit('submit', newPost);
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
