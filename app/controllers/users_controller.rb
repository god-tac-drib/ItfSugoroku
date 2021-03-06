# encoding: utf-8

class UsersController < ApplicationController
  # GET /users
  # GET /users.json
  def index
    @users = User.order(:name)
    @user = User.new # これを書いておかないと、undefined method `model_name' for NilClass:Class なるエラーが出る
    @user_status = current_user

    respond_to do |format|
      format.html # index.html.erb
      format.js # モーダル用に追加
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])
    @user_status = current_user

    respond_to do |format|
      format.html # show.html.erb
      format.js # モーダル用に追加
      format.json { render json: @user }
    end
  end

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.js # モーダル用に追加
      format.json { render json: @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(params[:user])
    @user_status = current_user

    respond_to do |format|
      if @user.save
        format.html { redirect_to users_url, notice: "ユーザ#{@user.name}を作成しました" }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])
    @user_status = current_user

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to users_url, notice: "ユーザ#{@user.name}を更新しました" }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.js { redirect_to users_url, notice: "ユーザを削除しました" } # モーダル用に追加
      format.json { head :no_content }
    end
  end
  
  
#   def called_from_js
#     @params = params
#     @user_status = current_user
#     @respons = User.find(params[:id]).name
#     
#     respond_to do |format|
#       format.js { render(:template => "ajax_respons/called_from_js") }
#     end
#   end
end
