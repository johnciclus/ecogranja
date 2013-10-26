class ArticlesController < ApplicationController

  def index
    @article = Article.find(:first, :offset =>rand(Article.count))
    @articles = Article.order('title')
    respond_to do |format|
      flash[:notice] = 'Articulos agropecuarios'
      flash[:success] = true
      format.html
    end
  end
  
  def admin
    if @mode == 'admin'
      @article = Article.new
      @articles = Article.order('title') 
      @categories = Category.order('name')
    end
    respond_to do |format|
      flash[:notice] = 'Administraci&oacute;n de articulos agropecuarios'
      flash[:success] = true
      format.html 
    end
  end
  
  def create
    if @mode == 'admin'
      @article = Article.new(params[:article])
      @articles = Article.order('title') 
      @categories = Category.order('name')
    end
    respond_to do |format|
      if @article.save
        flash[:notice] = 'El art&iacute;culo ha sido registrado satisfactoriamente.'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El art&iacute;culo no ha sido registrado.'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }
      end
    end
  end
  
  def show
    @article = Article.find(params[:id])
    @articles = Article.order('title')
    respond_to do |format|
        flash[:notice] = 'Art&iacute;culo: '+@article.title
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
    end
  end
  
  def edit
    if @mode == 'admin'
      @article = Article.find(params[:id])
      @categories = Category.order('name')
    end
    respond_to do |format|
        flash[:notice] = 'Edici&oacute;n del articulo: '+@article.title+'.'
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
      @article    = Article.find(params[:id])
      @articles   = Article.order('title')
      @categories = Category.order('name')
    end
    respond_to do |format|
      if @article.update_attributes(params[:article])
        flash[:notice] = 'El articulo ha sido actualizado satisfactoriamente'
        flash[:success] = true
        format.js {
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El articulo no ha sido actualizado'
        flash[:success] = false
        format.js {
          render :partial => 'refresh'
        }  
      end
    end
  end
  
  
  def destroy
    if @mode == 'admin'
      @article    = Article.find(params[:id])
      @articles   = Article.order('title')
      @categories = Category.order('name')
    end
    respond_to do |format|
      if @article.destroy
        flash[:notice] = 'El articulo fue eliminado satisfactoriamente'
        flash[:success] = true
        format.js { 
          render :partial => 'refresh'
        }
      else
        flash[:notice] = 'El articulo no fue eliminado'
        flash[:success] = false
        format.js { 
          render :partial => 'refresh'
        }
      end
    end
  end
end