<Page>
  <Navbar title="Login" backLink="Back" />

  {#if user}
  <Block>
    <List >
      <ListItem>Signed in as <u>{user.email}</u></ListItem>
      <ListButton fill title="Sign out" onClick={() => login()} >Sign out</ListButton>
    </List>
    <BlockFooter textColor={messageColor}>{message}</BlockFooter>
  </Block>
  {:else}
  <List accordionList>
      <ListItem accordionItem title="Login" accordionItemOpened on:accordionOpened={()=>{selectedItem = "login"}} style={accordionStyle['login']}>
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
      <ListItem accordionItem title="Forget password?" on:accordionOpened={()=>{selectedItem = "forgetPassword"}} style={accordionStyle['forgetPassword']}>
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
      <ListItem accordionItem title="Sign up for a new account" on:accordionOpened={()=>{selectedItem = "register"}} style={accordionStyle['register']}>
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
            <BlockFooter textColor={messageColor}>{message}</BlockFooter>
          </Block>
        </AccordionContent>
      </ListItem>
    </List>
  {/if}



</Page>
<script>
  import { Page, Navbar, Block, AccordionContent, BlockTitle, BlockHeader, BlockFooter, List, ListInput, ListButton, ListItem, Card } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  let state = "login";
  let user;
  let email = 'laji@list4d.com';
  let password = '123456';
  let message = "Not logged in yet";
  let messageColor = "";
  let selectedItem = "login";
  let accordionStyle={};

  $: {
    console.log("11111111111");
    for (let it of ['login', 'forgetPassword', 'register']){
      accordionStyle[it] = "color:blue;font-size:75%";
    }
    accordionStyle[selectedItem] = "";
  }    

  onMount(() => {
    let firebaseConfig = {
        apiKey: "AIzaSyCEBMrZkDnzPFTWrGCQg3GFHfLMJckus3o",
        authDomain: "auth-7667c.firebaseapp.com",
        databaseURL: "https://auth-7667c.firebaseio.com",
        projectId: "auth-7667c",
        storageBucket: "auth-7667c.appspot.com",
        messagingSenderId: "977429919824",
        appId: "1:977429919824:web:0b3fe755ee70b2a82db955"
      };
  
      firebase.initializeApp(firebaseConfig);    

      firebase.auth().onAuthStateChanged(function(u) {
        console.log("state changed", u);
        user = u;

        if (user){
          state = "signedIn";
          message = `logged in as ${user.email}`;
          messageColor = "teal";
        }
        else{
          state = "login";
        }
        /*
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
        */
      });
  })

  function login(){
    console.log(email, password);
    messageColor = "";
    message = "";  

    if (state=="register"){
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

    if (state=="signedIn"){
      firebase.auth().signOut().then(function() {
        console.log("Success");
        messageColor = "";
        message = "Successfully signed out";  
      }).catch(function(error) {
        console.log(error);
        messageColor = error.code ? "red" : "";
        message = error.message;  
      });
    }
  }
  function accordionOpened(e){
    console.log("accordionOpened", e);    


  }
</script>
