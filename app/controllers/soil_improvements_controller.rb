class SoilImprovementsController < ApplicationController
  
  def index
    unless @mode == 'public'
    @soil_improvement   =   SoilImprovement.new
      if @mode == 'normal'
        @farms              = Farm.where("user_id = '?'", @current_user.id)
        @soil_improvements  = SoilImprovement.where("farm_id = '?'", @farms.first.id)
      elsif @mode == 'admin'
        @farms              = Farm.order('name')
        @soil_improvements  = SoilImprovement.order('name')  
      end
    end
    respond_to do |format|
      flash[:notice] = 'Administraci&oacute;n de mejoramiento de suelos'
      flash[:success] = true
      format.html
    end
  end
  
  def create
    @soil_improvement     =   SoilImprovement.new(params[:soil_improvement])
    if @mode == 'normal'
      @farms              = Farm.where("user_id = '?'", @current_user.id)
      @soil_improvements  = SoilImprovement.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
      @soil_improvements  = SoilImprovement.order('name')
    end
    respond_to do |format|
      if @soil_improvement.save
        flash[:notice]  = 'El mejoramiento de suelos ha sido registrado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice]  = 'El mejoramiento de suelos no ha sido registrado.'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def edit
    @soil_improvement   = SoilImprovement.find(params[:id])
    if @mode == 'normal'
      @farms              = Farm.where("user_id = '?'", @current_user.id) 
    elsif @mode == 'admin'
      @farms              = Farm.order('name')
    end    
    respond_to do |format|
        flash[:notice] = 'Edici&oacute;n del mejoramiento de suelo: '+@soil_improvement.name+'.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }  
    end    
  end
  
  def update
    @soil_improvement   = SoilImprovement.find(params[:id])
    if @mode == 'normal'
      @farms         = Farm.where("user_id = '?'", @current_user.id)
      @soil_improvements = SoilImprovement.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
      @soil_improvements = SoilImprovement.order('name')
    end
    respond_to do |format|
      if @soil_improvement.update_attributes(params[:soil_improvement])
        flash[:notice] = 'El mejoramiento de suelos ha sido actualizado satisfactoriamente'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        } 
      else
        flash[:notice] = 'El mejoramiento de suelos no ha sido actualizado'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def destroy
    @soil_improvement   = SoilImprovement.find(params[:id])
    if @mode == 'normal'
      @farms             = Farm.where("user_id = '?'", @current_user.id)
      @soil_improvements = SoilImprovement.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
      @soil_improvements = SoilImprovement.order('name')
    end
    respond_to do |format|
      if @soil_improvement.destroy
        flash[:notice] = 'El mejoramiento de suelos fue eliminado satisfactoriamente'
        flash[:success] = true
        format.js { 
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El mejoramiento de suelos no fue eliminado'
        flash[:success] = false
        format.js { 
          render :partial => 'refresh'
        }        
      end
    end
  end
  
end
