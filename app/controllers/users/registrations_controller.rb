class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  
  def create
    build_resource(sign_up_params)
    if resource.save
      sign_in(resource_name, resource)
      render json: resource
    else
      render json: resource.errors, status: 400
    end
  end
end