Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'orders' => 'orders#index'
      get 'orders/:id' => 'orders#show'
      post 'orders' => 'orders#create'
      put 'orders/:id' => 'orders#update'
      delete 'orders/:id', to: 'orders#destroy'
    end
  end
  root 'dashboard#index'
  get '/*path' => 'dashboard#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
