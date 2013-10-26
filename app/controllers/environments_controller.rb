class EnvironmentsController < ApplicationController
  
  def index
    unless @mode == 'public'
      @environment   = Environment.new
      if @mode == 'normal'
        @farms         = Farm.where("user_id = '?'", @current_user.id)
        @environments  = Environment.where("farm_id = '?'", @farms.first.id)
      elsif @mode == 'admin'
        @farms         = Farm.order('name')
        @environments  = Environment.order('name')
      end
    end
    respond_to do |format|
      flash[:notice] = 'Administraci&oacute;n de Ambientes'
      flash[:success] = true
      format.html
    end
  end
  
  def create
      @environment   = Environment.new(params[:environment])
      if @mode == 'normal'
        @farms         = Farm.where("user_id = '?'", @current_user.id)
        @environments  = Environment.where("farm_id = '?'", @farms.first.id)
      elsif @mode == 'admin'
        @environments  = Environment.order('name')
      end  
    respond_to do |format|
      if @environment.save
        flash[:notice] = 'El ambiente ha sido registrado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El ambiente no ha sido registrado.'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        } 
      end
    end
  end
  
  def edit
    @environment  = Environment.find(params[:id])
    if @mode == 'normal'
      @farms      = Farm.where("user_id = '?'", @current_user.id)
    elsif @mode == 'admin'
      @farms      = Farm.order('name')
    end 
    respond_to do |format|
        flash[:notice] = 'Edici&oacute;n del ambiente: '+@environment.name+'.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }   
    end    
  end
  
  def update
    @environment   = Environment.find(params[:id])
    if @mode == 'normal'
      @farms         = Farm.where("user_id = '?'", @current_user.id)
      @environments  = Environment.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
      @environments  = Environment.order('name')
    end    
    respond_to do |format|
      if @environment.update_attributes(params[:environment])
        flash[:notice] = 'El ambiente ha sido actualizado satisfactoriamente'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El ambiente no ha sido actualizado'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }     
      end
    end
  end

  def destroy
    @environment   = Environment.find(params[:id])
    if @mode == 'normal'
      @farms         = Farm.where("user_id = '?'", @current_user.id)
      @environments  = Environment.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
      @environments  = Environment.order('name')
    end 
    respond_to do |format|
      if @environment.destroy
        flash[:notice] = 'El ambiente fue eliminado satisfactoriamente'
        flash[:success] = true
        format.js { 
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El ambiente no fue eliminado'
        flash[:success] = false
        format.js { 
          render :partial => 'refresh'
        }
      end
    end
  end

end
