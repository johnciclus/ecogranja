class HomeController < ApplicationController
  
  def index
     
  end
  
  def agropedia
    @articles = Article.order('title')
    @articles.reverse
    @article = Article.find(:first, :offset =>rand(Article.count))
    respond_to do |format|
      flash[:notice] = 'Agropedia'
      flash[:success] = true
      format.html
    end  
  end
  
  def learning
    
  end
  
  def farmsadmin
    
  end
  
  def administration
      
  end
  
  def decisionmaking
    
  end
end
