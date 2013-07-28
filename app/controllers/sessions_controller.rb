# encoding: utf-8

class SessionsController < ApplicationController
  skip_before_filter :authorize

  def new
    #@user = User.new
    @user_status = current_user
    respond_to do |format|
      format.html # new.html.erb
      format.js # モーダル用に追加
      #format.json { render json: @user }
    end
  end

  def create
#     respond_to do |format|
#       if @user.save
#         format.html { redirect_to users_url, notice: "ユーザ#{@user.name}を作成しました" }
#         format.json { render json: @user, status: :created, location: @user }
#       else
#         format.html { render action: "new" }
#         format.json { render json: @user.errors, status: :unprocessable_entity }
#       end
#     end
    
    respond_to do |format|
      user = User.find_by_name(params[:name])
      if user and user.authenticate(params[:password])
        session[:user_id] = user.id
        #redirect_to admin_url
        #redirect_to gamepage_url, alert: "ユーザ #{user.name} でログインしました"
        format.html { redirect_to gamepage_url, alert: "ユーザ #{user.name} でログインしました" }
      else
        #redirect_to login_url, alert: "無効なユーザ/パスワードの組み合わせです"
        format.html { redirect_to login_url, alert: "無効なユーザ/パスワードの組み合わせです" }
        format.js { redirect_to login_url, alert: "無効なユーザ/パスワードの組み合わせです" }
      end
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to gamepage_url, notice: "ログアウト"
  end
end
