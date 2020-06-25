<List accordionList>
  <ListItem accordionItem accordionItemOpened on:accordionOpened={()=>{selectedItem = "login"}}>
    <div slot="title" class:smaller={selectedItem!="login"}>Login</div>
    <AccordionContent>
      <Block>
        <BlockHeader>Please enter your phone no</BlockHeader>
        <List >
          {#if stage=="phone"}
          <ListInput
            outline
            label="Phone"
            floatingLabel
            type="tel"
            value={phone}
            onInput={(e)=>{phone=e.target.value}}
            clearButton />
          <ListButton on:click={submitPhoneNumberAuth} >Sign in with Phone</ListButton>            
          {/if}
          {#if stage=="code"}
          <ListInput
            outline
            label="Code"
            floatingLabel
            type="text"
            onInput={(e)=>{code=e.target.value}}
            clearButton />
            <ListButton on:click={submitPhoneNumberAuthCode} >Verify Code</ListButton>            
          {/if}
          
        </List>
        <BlockFooter textColor={messageColor}>{message}</BlockFooter>
      </Block>
    </AccordionContent>
  </ListItem>
  
</List>

<div id="recaptcha-container"></div>

<script>
  import { Button, Block, AccordionContent, BlockTitle, BlockHeader, BlockFooter, List, ListInput, ListButton, ListItem } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  let state = "login";
  let user;
  //let phone = "+16472006201";
  let phone = "";
  let code = '';
  let message = "Not logged in yet";
  let messageColor = "";
  let selectedItem = "login";

  let recaptchaVerifier;
  let confirmationResult;
  function login(){
    let provider = new firebase.auth.PhoneAuthProvider();

    firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
    .then(function (confirmationResult) {
      console.log(confirmationResult);
    }).catch(function (error) {
      console.log(error);
    });    
  }
  
  onMount(() => {
    console.log("on mount");
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: function(response) {
        console.log("recaptcha callback", response);
        console.log(response);
      }
    });
  });

console.log("init");
let stage = "phone";  //code
function submitPhoneNumberAuth(){
  console.log("submitPhoneNumberAuth");
  firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
    .then(function(result) {
      console.log("signInWithPhoneNumber callback", result);
      stage = "code";
      confirmationResult = result;
    })
    .catch(function(error) {
      console.log(error);
    });
}

function submitPhoneNumberAuthCode(){
  confirmationResult.confirm(code)
  .then(function(result) {
    console.log(result.user);
  })
  .catch(function(error) {
    console.log(error);
  });
}

</script>

<style>
.smaller {
  font-size: 75%;
  color: blue;
}
</style>
