class ProductionsController < ApplicationController
  
  def index
    unless @mode == 'public'
      @production   = Production.new
      if @mode == 'normal'
        @farms        = Farm.where("user_id = '?'", @current_user.id)
        @production_area = @farms.first.area
        @productions  = Production.where("farm_id = '?'", @farms.first.id)
      elsif @mode == 'admin'
        @farms        = Farm.order('name')
        @productions  = Production.order('name')
      end
    end
    respond_to do |format|
      flash[:notice]  = 'Administraci&oacute;n de Producciones'
      flash[:success] = true
      format.html
    end
  end
  
  def create
    @production     = Production.new(params[:production])
    if @mode == 'normal'
      @farms        = Farm.where("user_id = '?'", @current_user.id)
      @productions  = Production.where("farm_id = '?'", @farms.first.id)   
    elsif @mode == 'admin'
      @productions  = Production.order('name')
    end
    respond_to do |format|
      if @production.save
        flash[:notice] = 'La Producci&oacute;n ha sido registrada satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'La Producci&oacute;n no ha sido registrada.'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def edit
    @production   = Production.find(params[:id])
    if @mode == 'normal'
      @farms      = Farm.where("user_id = '?'", @current_user.id)
      @production_area = @farms.first.area
    elsif @mode == 'admin'
      @farms     = Farm.order('name')
    end
    respond_to do |format|
        flash[:notice] = 'Edici&oacute;n de la producci&oacute;n: '+@production.name+'.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        } 
    end    
  end
  
  def update
    @production   = Production.find(params[:id])
    if @mode == 'normal'
      @farms        = Farm.where("user_id = '?'", @current_user.id)
      @productions  = Production.where("farm_id = '?'", @farms.first.id)
    elsif @mode == 'admin'
      @productions  = Production.order('name')
    end
    respond_to do |format|
      if @production.update_attributes(params[:production])
        flash[:notice] = 'La Producci&oacute;n ha sido actualizada satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'La Producci&oacute;n no ha sido actualizada'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }     
      end
    end
  end
  
  def destroy
    @production   = Production.find(params[:id])
    if @mode == 'normal'
      @farms        = Farm.where("user_id = '?'", @current_user.id)
      @productions  = Production.where("farm_id = '?'", @farms.first.id)  
    elsif @mode == 'admin'
      @productions  = Production.order('name')
    end  
    respond_to do |format|
      if @production.destroy
        flash[:notice] = 'La Producci&oacute;n fue eliminada satisfactoriamente'
        flash[:success] = true
        format.js { 
          render :partial => 'refresh'
        } 
      else
        flash[:notice] = 'La Producci&oacute;n no fue eliminada'
        flash[:success] = false
        format.js { 
          render :partial => 'refresh'
        }
      end
    end
  end
  
end
