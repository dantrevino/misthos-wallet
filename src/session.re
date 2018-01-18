module Data = {
  type t = {
    blockstackId: string,
    appKeyPair: Bitcoin.ECPair.t,
    address: string
  };
  let fromUserData = userData =>
    switch (Js.Nullable.to_opt(userData##username)) {
    | None => None
    | Some(blockstackId) =>
      let appKeyPair = userData##appPrivateKey |> Utils.keyPairFromPrivateKey;
      Some({
        blockstackId,
        appKeyPair,
        address: appKeyPair |> Bitcoin.ECPair.getAddress
      });
    };
};

type t =
  | NotLoggedIn
  | LoginPending
  | AnonymousLogin
  | LoggedIn(Data.t);

let getCurrentSession = () =>
  if (Blockstack.isUserSignedIn()) {
    switch (Blockstack.loadUserData()) {
    | None => NotLoggedIn
    | Some(userData) =>
      switch (Data.fromUserData(userData)) {
      | None => AnonymousLogin
      | Some(sessionData) => LoggedIn(sessionData)
      }
    };
  } else if (Blockstack.isSignInPending()) {
    LoginPending;
  } else {
    NotLoggedIn;
  };

let completeLogIn = () =>
  Js.Promise.(
    Blockstack.handlePendingSignIn()
    |> then_(userData =>
         switch (Data.fromUserData(userData)) {
         | None => resolve(AnonymousLogin)
         | Some(sessionData) =>
           let appPubKey =
             sessionData.appKeyPair |> Utils.publicKeyFromKeyPair;
           UserPublicInfo.persist(~appPubKey)
           |> then_(() => resolve(LoggedIn(sessionData)));
         }
       )
  );

let signIn = () => {
  Blockstack.redirectToSignIn(
    ~redirectURI=Utils.origin ++ "/",
    ~manifestURI=Utils.origin ++ "/manifest.json",
    ~scopes=[|"store_write", "publish_data"|]
  );
  LoginPending;
};

let signOut = () => {
  Blockstack.signUserOut();
  NotLoggedIn;
};
