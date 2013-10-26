class ProfilesController < ApplicationController
  
  def index
    @profile  = Profile.new
    @profiles = Profile.order('name')
    respond_to do |format|
      flash[:notice] = 'Administraci&oacute;n de Perfiles'
      flash[:success] = true
      format.html
    end  
  end
  
  def create
    @profile = Profile.new(params[:profile])
    @profiles = Profile.order('name')
    respond_to do |format|
      if @profile.save
        flash[:notice] = 'El perfil ha sido registrado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El perfil no ha sido registrado.'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def edit
    @profile = Profile.find(params[:id])
    respond_to do |format|
        flash[:notice] = 'Edici&oacute;n del Perfil '+@profile.name+'.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
    end
  end
  
  def update
    @profile = Profile.find(params[:id])
    @profiles = Profile.order('name')
    respond_to do |format|
      if @profile.update_attributes(params[:profile])
        flash[:notice] = 'El perfil fue actualizado satisfactoriamente'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El perfil no fue actualizado'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def destroy
    @profile = Profile.find(params[:id])
    @profiles = Profile.order('name')
    respond_to do |format|
      if @profile.destroy
        flash[:notice] = 'El perfil fue eliminado satisfactoriamente.'
        flash[:success] = true
        format.js { 
          render :partial => 'refresh'
        }
      else  
        flash[:notice] = 'El perfil no fue eliminado  satisfactoriamente.'
        flash[:success] = false
        format.js { 
          render :partial => 'refresh'
        }
      end
    end
  end
  
end
