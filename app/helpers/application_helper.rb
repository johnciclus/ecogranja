module ApplicationHelper
  private
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def section_link(name,options)
    if options[:action] == @current_action and options[:controller] == @current_controller 
      link_to(name, options, :class => 'sel')
    else
      link_to(name,options)
    end
  end
end