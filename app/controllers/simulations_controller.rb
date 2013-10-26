class SimulationsController < ApplicationController
  def index
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
      flash[:notice] = 'Ambiente de simulaci&oacute;n'
      flash[:success] = true
      format.html
    end
  end
  
end
