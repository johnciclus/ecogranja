class CategoriesController < ApplicationController
  
  def index
    @category = Category.new
    @categories = Category.order('name')
    respond_to do |format|
      format.html 
    end
  end
  
  def create
    @category = Category.new(params[:category])
    respond_to do |format|
      if @category.save
        format.html {
          flash[:notice] = 'La categor&iacute;a ha sido registrada.'    
        }
      else
        format.html { 
          flash[:notice] = 'La categor&iacute;a no ha sido registrada.'  
        }
      end
      redirect_to :action => "index"
    end
  end
  
  def edit
    @category = Category.find(params[:id])
    @categories = Category.order('name')
    respond_to do |format|
        format.html { 
          render :action => "index" 
        }
    end
  end
  
  def update
    @category = Category.find(params[:id])
    respond_to do |format|
      if @category.update_attributes(params[:category])
        format.html {
          flash[:notice] = 'la categor&iacute;a fue actualizada satisfactoriamente' 
          redirect_to :action => "index" 
        } 
      else
        format.html {
          flash[:notice] = 'la categor&iacute;a no fue actualizada' 
          render action: "edit"
        }    
      end
    end
  end
  
  def destroy
    @category = Category.find(params[:id])
    respond_to do |format|
      if @category.delete
        format.html {
          flash[:notice] = 'la categor&iacute;a fue eliminada satisfactoriamente.' 
        }
      else  
        format.html { 
          flash[:notice] = 'la categor&iacute;a no fue eliminada.'
        }
      end
      redirect_to :action => "index"
    end
  end
  
end
