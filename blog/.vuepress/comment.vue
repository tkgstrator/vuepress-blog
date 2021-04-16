<template>
  <details class="send-comment-container">
    <summary>
      <span class="send-comment">コメントする</span>
    </summary>
    <form 
      name="suspendedComments"
      method="post"
      netlify
      netlify-honeypod="bot-field"
    >
      <div class="form-name">
        <div class="label" for="name">Name:</div>
        <input type="text" name="name" id="">
      </div>
      <div class="form-email">
        <div class="label" for="email">E-mail:</div>
        <input type="email" name="email" id="">
      </div>
      <div class="form-content">
        <div class="label" for="content">Content:</div>
        <textarea name="content" id="" cols="30" rows="10"></textarea>
      </div>
      <input type="hidden" name="pageKey" :value="$page.key">
      <input type="hidden" name="path" :value="$route.path">
      <input type="hidden" name="form-name" value="suspendedComments">
      <div>コメントは承認されると表示されます</div>
      <input type="submit" value="Send">
    </form>
  </details>
</template>

<script></script>
<style></style>