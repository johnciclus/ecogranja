class ApplicationController < ActionController::Base
  protect_from_forgery
  
  layout Proc.new { |controller| controller.request.xhr? ? false : 'application' }
  
  before_filter :instantiate_controller_and_action_names, :define_mode
 
  def instantiate_controller_and_action_names
    @current_controller = controller_name
    @current_action     = action_name
  end
  
  def define_mode
    if authenticate_user
      @mode = @current_user.profile.permissions  
    else
      @mode = 'public'
    end 
  end

  protected
  
  def authenticate_user
    unless session[:user_id]
      return false
    else
      @current_user = User.find session[:user_id] 
      return true
    end
  end
  
  def session_expiry
    @time_left = (session[:expires_at] - Time.now).to_i
    if @time_left < 0
      logout #reset_session
      flash[:notice] = 'Su sesi&oacute;n expir&oacute;, por favor ingresar de nuevo'
      render :partial => "/layouts/refresh"
    end
  end
  
  def update_activity_time
    session[:expires_at] = Time.now.advance(:minutes => 30)
  end
  
end
