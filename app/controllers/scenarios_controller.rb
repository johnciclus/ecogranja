class ScenariosController < ApplicationController
  
  def index
    unless @mode == 'public'
      @scenario           = Scenario.new
      @crops              = Crop.order('name')
      if @mode == 'normal'
        @farms              = Farm.where("user_id = '?'", @current_user.id)
        @environments       = Environment.where("farm_id = '?'", @farms.first.id)
        @productions        = Production.where("farm_id = '?'", @farms.first.id)
        @soil_improvements  = SoilImprovement.where("farm_id = '?'", @farms.first.id)
        @scenarios          = Scenario.where("farm_id = '?'", @farms.first.id)
      elsif @mode == 'admin'
        @farms              = Farm.order('name')
        @environments       = Environment.order('name')
        @productions        = Production.order('name')       
        @soil_improvements  = SoilImprovement.order('name')
        @scenarios          = Scenario.order('name')  
      end 
    end
    respond_to do |format|
      flash[:notice] = 'Administraci&oacute;n de Escenarios'
      flash[:success] = true
      format.html
    end
  end
  
  def create
    @scenario   = Scenario.new(params[:scenario])
    @crops              = Crop.order('name')
    if @mode == 'normal'
       @farms              = Farm.where("user_id = '?'", @current_user.id)
       @environments       = Environment.where("farm_id = '?'", @farms.first.id)
       @productions        = Production.where("farm_id = '?'", @farms.first.id)
       @soil_improvements  = SoilImprovement.where("farm_id = '?'", @farms.first.id)
       @scenarios          = Scenario.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
       @farms              = Farm.order('name')
       @environments       = Environment.order('name')
       @productions        = Production.order('name')       
       @soil_improvements  = SoilImprovement.order('name')
       @scenarios          = Scenario.order('name')  
    end
    respond_to do |format|
      if @scenario.save
        flash[:notice] = 'El escenario ha sido registrado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El escenario no ha sido registrado.'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def edit   
    @scenario           = Scenario.find(params[:id])
    @crops              = Crop.order('name')
    if @mode == 'normal'
       @farms              = Farm.where("user_id = '?'", @current_user.id)
       @environments       = Environment.where("farm_id = '?'", @farms.first.id)
       @productions        = Production.where("farm_id = '?'", @farms.first.id)
       @soil_improvements  = SoilImprovement.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
       @farms              = Farm.order('name')
       @environments       = Environment.order('name')
       @productions        = Production.order('name')       
       @soil_improvements  = SoilImprovement.order('name')
    end
    respond_to do |format|
      flash[:notice] = 'Edici&oacute;n del escenario: '+@scenario.name+'.'
      flash[:success] = true
      format.js {
        render :partial => 'refresh'
      } 
    end    
  end
  
  def update
    @scenario   = Scenario.find(params[:id])
    if @mode == 'normal'
      @farms         = Farm.where("user_id = '?'", @current_user.id)
      @scenarios          = Scenario.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
      @scenarios          = Scenario.order('name')
    end
    respond_to do |format|
      if @scenario.update_attributes(params[:scenario])
        flash[:notice] = 'El escenario ha sido actualizado satisfactoriamente'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        } 
      else
        flash[:notice] = 'El escenario no ha sido actualizado'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }     
      end
    end
  end
  
  def destroy
    @scenario   = Scenario.find(params[:id])
    if @mode == 'normal'
      @farms              = Farm.where("user_id = '?'", @current_user.id)
      @scenarios          = Scenario.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
      @scenarios          = Scenario.order('name')
    end
    respond_to do |format|
      if @scenario.destroy
        flash[:notice] = 'El escenario fue eliminado satisfactoriamente'
        flash[:success] = true
        format.js { 
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El escenario no fue eliminado'
        flash[:success] = false
        format.js { 
          render :partial => 'refresh'
        }
      end
    end
  end
  
end