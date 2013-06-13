class ApplicationController < ActionController::Base
  protect_from_forgery
  
  
  private
  
  #セッション情報から現在のユーザを取得する
  def current_user
    User.find(session[:user_id])
  rescue ActiveRecord::RecordNotFound
    nil
  end
    
end
