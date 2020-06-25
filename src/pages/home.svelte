<Page name="home">
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>ex</NavTitle>
    <NavRight>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
    </NavRight>
  </Navbar>

  <!-- Page content -->
  <Block strong>
    <p id="example">This is an example of tabs-layout application.</p>

    <p>Each tab/view may have different layout, different navbar type (dynamic, fixed or static) or without navbar like this tab.</p>
  </Block>


<BlockTitle>Mail App</BlockTitle>
  <List mediaList>
  {#each items as item}
    <ListItem
      link="#"
      title={item.title}
      after={item.price}
      subtitle={item.subtitle}
      text={item.uid}
    >
    <div slot="content"><Button iconMaterial="delete" on:click={()=>{deleteItem(item.id)}}/></div>
    </ListItem>
  {/each}
  </List>

  <BlockTitle>Navigation</BlockTitle>
  <List>
    <ListItem link="/about/" title="About"/>
    <ListItem link="/form/" title="Form"/>
  </List>

  <BlockTitle>Modals</BlockTitle>
  <Block strong>
    <Row>
      <Col width="50">
        <Button fill raised on:click={testRead}>testRead</Button>
      </Col>
      <Col width="50">
        <Button fill raised on:click={testWrite}>testWrite</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Panels</BlockTitle>
  <Block strong>
    <Row>
      <Col width="50">
        <Button fill raised panelOpen="left">Left Panel</Button>
      </Col>
      <Col width="50">
        <Button fill raised panelOpen="right">Right Panel</Button>
      </Col>
    </Row>
  </Block>

  <List>
    <ListItem
      title="Dynamic (Component) Route"
      link="/dynamic-route/blog/45/post/125/?foo=bar#about"
    />
    <ListItem
      title="Default Route (404)"
      link="/load-something-that-doesnt-exist/"
    />
    <ListItem
      title="Request Data & Load"
      link="/request-and-load/user/123456/"
    />
  </List>
</Page>
<script>
  import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button,
    Icon
  } from 'framework7-svelte';


  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import { user } from '../components/security/user.js';
  
  firebase.firestore().enablePersistence()
  .catch(function(err) {
    console.log("error=", err);
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

let currentUser;
  let db = firebase.firestore();

  let items = [];

  user.subscribe(value => {
    currentUser = value;
    console.log(currentUser);
    if (currentUser) testRead();
  });

  
  function testRead(){
    //db.collection("items").get().then((querySnapshot) => {
    db.collection("items").where('uid', "==", currentUser.uid).get().then((querySnapshot) => {      
      items = querySnapshot.docs.map((doc)=>{
        let d = doc.data();
        return {
          id: doc.id,
          title: d.title,
          price: d.price,
          subtitle: d.subtitle,
          text: d.text, 
          uid: d.uid
        };
      })
    });    
  }
  
  function testWrite(){
    console.log("test data");

    db.collection("items").add({
      title: "title",
      subtitle: "subtitle",
      price: (Math.random()*10).toFixed(2),
      text: "text",
      uid: currentUser.uid
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });    
  }

  function deleteItem(id){
    console.log("delete", id);

    db.collection("items").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
</script>

<style>
#example {
  background-color: brown;
}
</style>