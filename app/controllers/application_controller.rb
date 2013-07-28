class ApplicationController < ActionController::Base
  protect_from_forgery
  
  
  def called_from_js
    @params = params
    _modelObject = params[:model].constantize #モデル名は文字列で渡して来ざるを得ないので、ここでモデルオブジェクトを指す定数に変換。constantizeは、railsによるrubyのStringクラス拡張で施されたメソッド。これを鑑みるにどうやらrailsではモデルオブジェクトなどを指すクラス名はグローバルな定数として定義されるという仕組みのよう。よってコントローラの中でモデルにUserといったような記述でアクセスできる
    
    if (params[:accessType] == "read")
      #@response = _modelObject.find(params[:id]).name
      #@response = _modelObject.find(params[:id]).to_xml(:only => %w[name])
      @response = _modelObject.find(params[:id]).to_json(:only => params[:attrToReadOrWrite])
      #@response = ActiveSupport::JSON.decode(_json).name
      
      respond_to do |format|
        format.js { render(:template => "ajax_response/called_from_js") }
      end
      
    #elsif
      
    else
#       @user = _modelObject.new(params[:user])
#       
#       respond_to do |format|
#         if @user.save
#           format.html { redirect_to users_url, notice: "ユーザ#{@user.name}を作成しました" }
#           format.json { render json: @user, status: :created, location: @user }
#         else
#           format.html { render action: "new" }
#           format.json { render json: @user.errors, status: :unprocessable_entity }
#         end
#       end
      
    end
   
  end
  
  
  
  private
  
  #セッション情報から現在のユーザを取得する
  def current_user
    User.find(session[:user_id])
  rescue ActiveRecord::RecordNotFound
    nil
  end
  

    
end
