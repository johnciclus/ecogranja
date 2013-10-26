class CoordinatesController < ApplicationController
  
  def index
    @coordinate  = Coordinate.new
    @coordinates = Coordinate.order('id')
    @farms = Farm.order('name')
    respond_to do |format|
      format.html 
    end
  end
  
  def create
    @coordinate = Coordinate.new(params[:coordinate])
    respond_to do |format|
      if @coordinate.save
        format.html {
          flash[:notice] = 'La coordenada ha sido registrada.'
        }
      else
        format.html {
          flash[:notice] = 'La coordenada no ha sido registrada.'
        }
      end
      redirect_to :action => "index"
    end
  end
  
  def edit
    @coordinate  = Coordinate.find(params[:id])
    @coordinates = Coordinate.order('farm_id')
    @farms       = Farm.order('name')
    respond_to do |format|
        format.html{
          render :action => "index" 
        } 
    end
  end
  
  def update
    @coordinate = Coordinate.find(params[:id])
    respond_to do |format|
      if @coordinate.update_attributes(params[:coordinate])
        format.html {
          flash[:notice] = 'La coordenada fue actualizada satisfactoriamente' 
          redirect_to :action => "index"  
        } 
      else
        format.html { 
          flash[:notice] = 'La coordenada no fue actualizado'
          render action: "edit" 
        }    
      end
    end
  end
  
  def destroy
    @coordinate = Coordinate.find(params[:id])
    @farms      = Farm.order('name')
    respond_to do |format|
      if @coordinate.delete
        format.html {
          flash[:notice] = 'La coordenada fue eliminada satisfactoriamente.'   
        }
      else  
        format.html {
          flash[:notice] = 'La coordenada no fue eliminada.' 
        }
      end
      redirect_to :action => "index"
    end
  end
  
end
