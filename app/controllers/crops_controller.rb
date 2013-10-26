class CropsController < ApplicationController
  
  def index
    @crop     = Crop.find(:first, :offset =>rand(Crop.count))
    @crops    = Crop.order('name')
    @articles = Article.order('title')
    respond_to do |format|
      flash[:notice] = 'Administraci&oacute;n de Cultivos'
      flash[:success] = true
      format.html
    end
  end
  
  def admin
    if @mode == 'admin'
      @crop     = Crop.new
      @crops    = Crop.order('name')
      @articles = Article.order('title')
    end
    respond_to do |format|
      flash[:notice] = 'Administraci&oacute;n de Cultivos'
      flash[:success] = true
      format.html
    end
  end
  
  def create
    if @mode == 'admin'
      @crop     = Crop.new(params[:crop])
      @crops    = Crop.order('name')
      @articles = Article.order('title')
    end
    respond_to do |format|
      if @crop.save
        flash[:notice] = 'El cultivo ha sido registrado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El cultivo no ha sido registrado.'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        } 
      end
    end
  end
  
  def show
    @crop     = Crop.new
    @crops    = Crop.order('name')
    respond_to do |format|
        flash[:notice] = 'Cultivo: '+@crop.name
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
    end
  end
  
  def edit
    if @mode == 'admin'
      @crop     = Crop.find(params[:id])
      @crops    = Crop.order('name')
      @articles = Article.order('title')
    end
    respond_to do |format|
        flash[:notice] = 'Edici&oacute;n del cultivo: '+@crop.name+'.'
        flash[:success] = true
        format.html{
          render :action => "admin" 
        }
        format.js {
          render :partial => 'refresh'
        } 
    end    
  end
  
  def update
    if @mode == 'admin'
      @crop     = Crop.find(params[:id])
      @crops    = Crop.order('name')
      @articles = Article.order('title')
    end
    respond_to do |format|
      if @crop.update_attributes(params[:crop])
        flash[:notice] = 'El cultivo ha sido actualizado satisfactoriamente'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El cultivo no ha sido actualizado'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def destroy
    if @mode == 'admin'
      @crop     = Crop.find(params[:id])
      @crops    = Crop.order('name')
      @articles = Article.order('title')
    end
    respond_to do |format|
      if @crop.destroy
        flash[:notice] = 'El cultivo fue eliminado satisfactoriamente'
        flash[:success] = true
        format.js { 
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El cultivo no fue eliminado'
        flash[:success] = false
        format.js { 
          render :partial => 'refresh'
        }
      end
    end
  end
  
end
