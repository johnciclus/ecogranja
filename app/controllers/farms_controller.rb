class FarmsController < ApplicationController
    
  def index
    unless @mode == 'public'
      @farm  = Farm.new
      for i in 0..2
        @farm.coordinates[i] = Coordinate.new(:ind => i, :farm_id => @farm.id)
      end
      if @mode == 'normal'
        @user  = User.find(@current_user.id)
        @farms = Farm.where("user_id = '?'", @current_user.id)
      elsif @mode == 'admin'
        @farms = Farm.order('name')
        @users = User.order('username')
      end
    end
    respond_to do |format|
      flash[:notice] = 'Administraci&oacute;n de Granjas'
      flash[:success] = true
      format.html
    end
  end

  def create
    coordinates = params[:farm][:coordinates_attributes]
    params[:farm].delete :coordinates_attributes
    @farm = Farm.new(params[:farm])
    if @mode == 'normal'
      @user  = User.find(@farm.user_id)
      @farms = Farm.where("user_id = '?'", @current_user.id)
    elsif @mode == 'admin'
      @users = User.order('username')
      @farms = Farm.order('name')
    end
    respond_to do |format|
      if @farm.save
        coordinates.each do |coord|
          coord[1].merge!(:farm_id => @farm.id)
          coordinate = Coordinate.new(coord[1])
          coordinate.save
        end
        flash[:notice] = 'La Granja ha sido registrada satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }         
      else
        flash[:notice] = 'La Granja no ha sido registrada.'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        } 
      end
    end
  end

  def edit
    @farm = Farm.find(params[:id])    
    if @mode == 'normal'
      @user  = User.find(@farm.user_id)
    elsif @mode == 'admin'
      @users = User.order('username')
    end
    respond_to do |format|
        flash[:notice] = 'Edici&oacute;n de la Granja: '+@farm.name+'.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }  
    end    
  end
  
  def update
    coordinates = params[:farm][:coordinates_attributes]
    params[:farm].delete :coordinates_attributes
    @farm = Farm.find(params[:id])
    if @mode == 'normal'
      @user  = User.find(@farm.user_id)
      @farms = Farm.where("user_id = '?'", @farm.user_id)
    elsif @mode == 'admin'
      @users = User.order('username')
      @farms = Farm.order('name')
    end
    respond_to do |format|
      if @farm.update_attributes(params[:farm])
        # if @farm.coordinates.count == coordinates.count
        #   coordinates.each_with_index do {|coord, i|}
        #     coord[1].merge!(:farm_id => @farm.id)
        #     @farm.coordinates[i].update_attributes(coord[1])
        #     @farm.coordinates[i].save
        #   end
        # elsif @farm.coordinates.count > coordinates.count
        # 
        # elsif @farm.coordinates.count < coordinates.count      
        #
        # end
        flash[:notice] = 'La Granja ha sido actualizada satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        format.js {
          flash[:notice] = 'La Granja no ha sido actualizada'
          flash[:success] = false
          render :partial => 'refresh'
        }     
      end
    end
  end
  
  def destroy
    @farm = Farm.find(params[:id])
    @user  = User.find(@current_user.id)
    if @mode == 'normal'
      @farms = Farm.where("user_id = '?'", @current_user.id)
    elsif @mode == 'admin'
      @farms = Farm.order('name')
      @users = User.order('username')
    end
    
    respond_to do |format|
      if @farm.destroy
        flash[:notice] = 'La granja fue eliminada satisfactoriamente'
        flash[:success] = true
        format.js { 
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'La granja no fue eliminada'
        flash[:success] = false
        format.js { 
          render :partial => 'refresh'
        }
      end
    end
  end
  
end
