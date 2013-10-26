Ecogranja::Application.routes.draw do
  root :to => "home#index"
  
  match "login",  :to => "sessions#login_attempt"
  match "logout", :to => "sessions#logout"
  
  match '/home/agropedia'         => 'home#agropedia'
  match '/home/learning'          => 'home#learning'
  match '/home/farmsadmin'        => 'home#farmsadmin'
  match '/home/administration'    => 'home#administration'
  match '/home/decisionmaking'    => 'home#decisionmaking'
  match '/sessions/login_attempt' => 'sessions#login_attempt'
  match '/sessions/logout'        => 'sessions#logout'
  match '/articles/admin'         => 'articles#admin'
  match '/crops/admin'            => 'crops#admin'  
  
  resources :home, :users, :profiles, :sessions, :farms, :coordinates, :crops, :productions, :environments, :soil_improvements, :scenarios, :articles, :categories, :simulations 
  
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
