<Page>
  <Navbar title={selectedLm.title} backLink="Back" />

  {#if currentUser}
  <Block>
    <List >
      <ListItem>Signed in as <u>{currentUser.email||currentUser.phoneNumber}</u></ListItem>
      <ListButton onClick={() => logout()} >Sign out</ListButton>
    </List>
    <BlockFooter textColor={messageColor}>{message}</BlockFooter>
  </Block>
  {:else}
    {#if selectedLm.name == 'email'}
      <EmailProvider />
    {/if}
    {#if selectedLm.name == 'phone'}
      <PhoneProvider />
    {/if}
    
    <Block>
      <List Title="Other ways to Login">
        {#each lms as lm }
        <ListButton fill title="Sign out" onClick={()=>{changeLm(lm.name)}}>
          <span class:smaller={selectedLm.name!=lm.name}>{lm.title}</span>
        </ListButton>
        {/each}

        <ListButton fill title="Sign out" onClick={()=>{google()}}>
          <span class="smaller">Login by Google</span>
        </ListButton>
      </List>
    </Block>

  {/if}

</Page>
<script>
  import { Page, Navbar, Block, AccordionContent, BlockTitle, BlockHeader, BlockFooter, List, ListInput, ListButton, ListItem, Card } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  import EmailProvider from '../components/security/emailProvider.svelte';
  import PhoneProvider from '../components/security/phoneProvider.svelte';
  import { user } from '../components/security/user.js';

  let currentUser;
  let state = "login";
  let email = 'laji@list4d.com';
  let password = '123456';
  let message = "Not logged in yet";
  let messageColor = "";
  let selectedItem = "login";
  let accordionStyle={};
  //login method
  let lms = [
    {
      name: 'email',
      title: 'Login by Email'
    }, 
    {
      name:'phone',
      title: 'Login by Phone (SMS)'
    }, 
  ];
  let selectedLm = lms[1];
  $: {
    for (let it of ['login', 'forgetPassword', 'register']){
      accordionStyle[it] = "smaller";
    }
    accordionStyle[selectedItem] = "";
  }    

  user.subscribe(value => {
    currentUser = value;
    
    if (currentUser){
      state = "signedIn";
      message = `logged in as ${currentUser.email||currentUser.phoneNumber}`;
      messageColor = "teal";
    }
    else{
      state = "login";
    }

  });
  
  onMount(() => {
  })

  function changeLm(lm){
    selectedLm = lms.find((o)=>o.name==lm); 
  }

  function logout(){
    firebase.auth().signOut();
  }

  function google(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
</script>
<style>
.smaller {
  font-size: 75%;
  color: blue;
}
</style>
