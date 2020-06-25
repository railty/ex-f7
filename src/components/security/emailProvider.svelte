{state}
  <List accordionList>
    <ListItem accordionItem accordionItemOpened on:accordionOpened={()=>{state = "login"}}>
      <div slot="title" class:smaller={state!="login"}>Login</div>
      <AccordionContent>
        <Block>
          <BlockHeader>Please enter your email and password</BlockHeader>
          <List >
            <ListInput
              outline
              label="Email"
              floatingLabel
              type="email"
              value={email}
              onInput={(e)=>{email=e.target.value}}
              clearButton />
            <ListInput
              outline
              label="Password"
              floatingLabel
              type="password"
              password={password}
              onInput={(e)=>{password=e.target.value}}
              clearButton />
            <ListButton fill title="Sign In" onClick={() => login()} >Sign in</ListButton>
          </List>
          <BlockFooter textColor={messageColor}>{message}</BlockFooter>
        </Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem on:accordionOpened={()=>{state = "forgetPassword"}}>
      <div slot="title" class:smaller={state!="forgetPassword"}>Forget password?</div>
      <AccordionContent>
        <Block>
          <BlockHeader>Please enter your email</BlockHeader>
          <List >
            <ListInput
              outline
              label="Email"
              floatingLabel
              type="email"
              value={email}
              onInput={(e)=>{email=e.target.value}}
              clearButton />
            <ListButton fill title="Sign In" onClick={() => login()} >Reset password by Email</ListButton>
          </List>
          <BlockFooter textColor={messageColor}>{message}</BlockFooter>
        </Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem on:accordionOpened={()=>{state = "register"}}>
      <div slot="title" class:smaller={state!="register"}>Sign up for a new account</div>
      <AccordionContent>
        <Block>
          <BlockHeader>Register by email and password</BlockHeader>
          <List >
            <ListInput
              outline
              label="Email"
              floatingLabel
              type="email"
              value={email}
              onInput={(e)=>{email=e.target.value}}
              clearButton />
            <ListInput
              outline
              label="Password"
              floatingLabel
              type="password"
              password={password}
              onInput={(e)=>{password=e.target.value}}
              clearButton />
            <ListButton fill title="Sign In" onClick={() => login()} >Register</ListButton>
          </List>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>

<Block textColor={messageColor}>
  {message}
</Block>

<script>
  import { Block, AccordionContent, BlockTitle, BlockHeader, BlockFooter, List, ListInput, ListButton, ListItem, Card } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  let state = "login";
  let user;
  let email = 'laji@list4d.com';
  let password = '123456';
  let message = "Not logged in yet";
  let messageColor = "";

  function login(){
    console.log(email, password);
    messageColor = "";
    message = "";  

    console.log("state=", state);
    if (state=="register"){
      console.log("1111111");
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        messageColor = error.code ? "red" : "";
        message = error.message;  
      });      
    }

    if (state=="login"){
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error);
        messageColor = error.code ? "red" : "";
        message = error.message;  
      });
    }

    if (state=="resetPassword"){
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        console.log("Success");
        messageColor = "";
        message = "Please check your email form instruction";  
      }).catch(function(error) {
        // An error happened.
      });
    }
  }
</script>

<style>
.smaller {
  font-size: 75%;
  color: blue;
}
</style>
