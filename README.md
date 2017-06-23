# react-drupal-example
An example Drupal 8 module with React integration

The 'favorite' module adds an entity reference field to user accounts to store nodes that they have favorited. (You can remove the field from form displaying on account edit at /admin/config/people/accounts/form-display ).

Using React.js nodes will get a Favorite/Unfavorite link.

To work with the js file favorite/js/favorite.js, you need to run 'npm install' in the js directory to initialize. You also need to install webpack on your machine: 'sudo npm install webpack -g'

When you make changes to favorite.js, run 'webpack' in the js directory to compile to favorite.bundle.js.
