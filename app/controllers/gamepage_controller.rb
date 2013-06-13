class GamepageController < ApplicationController
  def index
    @user_status = current_user # /はgameplay/index.htmlにルーティングされているので、サイドバーでのユーザ情報表示に必要になるインスタンス変数はここで宣言する
  end
end
