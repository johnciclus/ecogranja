class SessionsController < ApplicationController
    
  def login_attempt
    authorized_user = User.authenticate(params[:username_or_email],params[:login_password])
      
    respond_to do |format|
      if authorized_user
        session[:user_id] = authorized_user.id
        define_mode
        
        flash[:notice] = "Bienvenido, #{authorized_user.username}"
        format.js {
          render :partial => "/layouts/refresh" 
        }
      else
        flash[:notice] = "Nombre de usuario o contrase&ntilde;a no validos"
        format.js {
          render :partial => "/layouts/refresh" 
        }
      end
    end
  end
  
  def logout
    session[:user_id] = nil
    define_mode
    
    respond_to do |format|
      flash[:notice] = 'El usuario ha salido de EcoGranja.'
      format.js{
          render :partial => "/layouts/refresh"
      }
    end
  end
  
end
