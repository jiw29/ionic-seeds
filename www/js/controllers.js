angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

// kick off the platform web client
Ionic.io();

// this will give you a fresh user or the previously saved 'current user'
var user = Ionic.User.current();

// if the user doesn't have an id, you'll need to give it one.
if (!user.id) {
  user.id = Ionic.User.anonymousId();
  // user.id = 'your-custom-user-id';
}

//persist the user
user.save();




  var deploy = new Ionic.Deploy(); 
    // Update app code with new release from Ionic Deploy
    $scope.doUpdate = function() {
      deploy.update().then(function(res) {
        console.log('Ionic Deploy: Update Success! ', res);
      }, function(err) {
        console.log('Ionic Deploy: Update error! ', err);
      }, function(prog) {
        console.log('Ionic Deploy: Progress... ', prog);
      });
    };

    // Check Ionic Deploy for new code
    $scope.checkForUpdates = function() {
      console.log('Ionic Deploy: Checking for updates');
      deploy.check().then(function(hasUpdate) {
        console.log('Ionic Deploy: Update available: ' + hasUpdate);
        $scope.hasUpdate = hasUpdate;
      }, function(err) {
        console.error('Ionic Deploy: Unable to check for updates', err);
      });
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $ionicAnalytics.track('ChatDetail', {
    item_id: 'ChatDetail',
    item_name: 'roll in'
  });
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
