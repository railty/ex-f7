<App params={ f7params } >

  <!-- Left panel with cover effect-->
  <Panel left cover themeDark>
    <View>
      <Page>
        <Navbar title="Left Panel"/>
        <Block>Left panel content goes here</Block>
      </Page>
    </View>
  </Panel>

  <!-- Right panel with reveal effect-->
  <Panel right reveal themeDark>
    <View id="right-view">
      <Page>
        <Navbar title="Account"/>
        <List>
          <ListItem link="/login/" panelClose view="#view-home" title="Login">{currentUser ? currentUser.email||currentUser.phoneNumber : 'Login'}</ListItem>
        </List>
      </Page>
    </View>
  </Panel>


  <!-- Views/Tabs container -->
  <Views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <Toolbar tabbar labels bottom>
      <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconAurora="f7:house_fill" iconMd="material:home" text="Home" />
      <Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconAurora="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
      <Link tabLink="#view-settings" iconIos="f7:gear" iconAurora="f7:gear" iconMd="material:settings" text="Settings" />
    </Toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tabActive" prop -->
    <View id="view-home" main tab tabActive url="/" pushState="true" />

    <!-- Catalog View -->
    <View id="view-catalog" name="catalog" tab url="/catalog/" />

    <!-- Settings View -->
    <View id="view-settings" name="settings" tab url="/settings/" />

  </Views>


  <!-- Popup -->
  <Popup id="my-popup">
    <View>
      <Page>
        <Navbar title="Popup">
          <NavRight>
            <Link popupClose>Close</Link>
          </NavRight>
        </Navbar>
        <Block>
          <p>Popup content goes here.</p>
        </Block>
      </Page>
    </View>
  </Popup>

  <LoginScreen id="my-login-screen">
    <View>
      <Page loginScreen>
        <LoginScreenTitle>Login</LoginScreenTitle>
        <List form>
          <ListInput
            type="text"
            name="username"
            placeholder="Your username"
            value={username}
            onInput={(e) => username = e.target.value}
          />
          <ListInput
            type="password"
            name="password"
            placeholder="Your password"
            value={password}
            onInput={(e) => password = e.target.value}
          />
        </List>
        <List>
          <ListButton title="Sign In" onClick={() => alertLoginData()} />
        </List>
        <BlockFooter>
          Some text about login information.<br />Click "Sign In" to close Login Screen
        </BlockFooter>
      </Page>
    </View>
  </LoginScreen>
</App>
<script>
  import { onMount } from 'svelte';

  import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter
  } from 'framework7-svelte';

  import routes from '../js/routes';
  import firebase from 'firebase/app';
  import { user } from '../components/security/user.js';

  let currentUser;
  user.subscribe(value => {
    currentUser = value;
    console.log(currentUser);
  });

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
    user.set(u);
  });

  // Framework7 Parameters
  let f7params = {
    name: 'ex', // App name
    theme: 'auto', // Automatic theme detection

    // App root data
    data: function () {
      return {

        // Demo products for Catalog section
        products: [
          {
            id: '1',
            title: 'Apple iPhone 8',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
          },
          {
            id: '2',
            title: 'Apple iPhone 8 Plus',
            description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
          },
          {
            id: '3',
            title: 'Apple iPhone X',
            description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
          },
        ]
      };
    },

    // App routes
    routes: routes,
  };
  // Login screen demo data
  let username = '';
  let password = '';

  function alertLoginData() {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  }
  onMount(() => {
    f7ready(() => {

      // Call F7 APIs here
    });
  })
</script>