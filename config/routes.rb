Rails.application.routes.draw do
  devise_for :users, 
  path: '', 
  path_names: {
    sign_in: 'signin',
    sign_out: 'signout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      get 'referrals/index'
      post 'referrals/create'
      get 'referrals/show/:id', to: 'referrals#show'
      delete 'referrals/destroy/:id', to: 'referrals#destroy'
    end
  end

  root to: 'login#index'

  get '/login', to: 'login#index'
  get '/registration', to: 'registration#index'
  get '/logout', to: 'logout#index'
  get '/referrals', to: 'referrals#index'
  get '/referrals/new', to: 'referrals#new'
end