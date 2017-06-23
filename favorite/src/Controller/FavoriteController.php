<?php

namespace Drupal\favorite\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;

class FavoriteController extends ControllerBase {

  public function getData(Node $node) {
    $user = User::load($this->currentUser()->id());
    $data['user_uid'] = $user->id();
    $data['user_uuid'] = $user->uuid();
    $data['node_type'] = $node->getType();
    $data['node_uuid'] = $node->uuid();

    $data['favorited'] = FALSE;
    $favorites = $user->field_favorites;
    if ($favorites) {
      foreach ($favorites as $favorite) {
        if ($favorite->entity->id() == $node->id()) {
          $data['favorited'] = TRUE;
          break;
        }
      }
    }
    return new JsonResponse($data);
  }
}
