class UsersController < ApplicationController
  
  def index
      @user  = User.new
      @profile = Profile.where("name = 'PAP'").first
    if @mode == 'admin'
      @users = User.order('username')
      @profiles = Profile.order('name')    
    end
    respond_to do |format|
        format.html{
          render :action => 'index'
        }
    end
  end
    
  def create
    @user     = User.new(params[:user])
    @profile = Profile.where("name = 'PAP'").first
    if @mode == 'admin'
      @users    = User.order('username')
      @profiles = Profile.order('name')
    end
    respond_to do |format|
      if @user.save
        flash[:notice]  = 'El usuario ha sido registrado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice]  = 'El usuario no ha sido registrado.'
        flash[:success] = true
        format.js{
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def show
    @user  = User.find(params[:id])
    respond_to do |format|
        format.html{
          render :action => 'index' 
        }  
    end
  end
  
  def edit
    @user     = User.find(params[:id])
    if @mode == 'normal'
      @profile = Profile.where("name = 'PAP'").first
    elsif @mode == 'admin'
      @users    = User.order('username')
      @profiles = Profile.order('name')  
    end
    respond_to do |format|
        flash[:notice] = 'Edici&oacute;n del Usuario: '+@user.name+'.'
        flash[:success] = true
        format.html {
          render :action => 'index'
        }
        format.js {
          render :partial => 'refresh'
        }
    end
  end
  
  def update
    @user = User.new
    user_update = User.find(params[:id])
    if @mode == 'normal'
      @profile = Profile.where("name = 'PAP'").first
    elsif @mode == 'admin'
      @users    = User.order('username')
      @profiles = Profile.order('name')  
    end
    respond_to do |format|
      if user_update.update_attributes(params[:user])
        flash[:notice] = 'El usuario fue actualizado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        } 
      else
        flash[:notice] = 'El usuario no fue actualizado'
        flash[:success] = false
        format.js {   
          render :partial => 'refresh'
        }    
      end
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    if @mode == 'normal'
      @profile = Profile.where("name = 'PAP'").first
    elsif @mode == 'admin'
      @users    = User.order('username')
      @profiles = Profile.order('name')  
    end
    respond_to do |format|
      if @user.delete
        flash[:notice] = 'El usuario fue eliminado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El usuario no fue eliminado'
        flash[:success] = false
        format.js {   
          render :partial => 'refresh'
        }
      end
    end
  end
  
end
