require 'test_helper'

class CollectedCharactersControllerTest < ActionController::TestCase
  setup do
    @collected_character = collected_characters(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:collected_characters)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create collected_character" do
    assert_difference('CollectedCharacter.count') do
      post :create, collected_character: { character_id: @collected_character.character_id, user_id: @collected_character.user_id }
    end

    assert_redirected_to collected_character_path(assigns(:collected_character))
  end

  test "should show collected_character" do
    get :show, id: @collected_character
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @collected_character
    assert_response :success
  end

  test "should update collected_character" do
    put :update, id: @collected_character, collected_character: { character_id: @collected_character.character_id, user_id: @collected_character.user_id }
    assert_redirected_to collected_character_path(assigns(:collected_character))
  end

  test "should destroy collected_character" do
    assert_difference('CollectedCharacter.count', -1) do
      delete :destroy, id: @collected_character
    end

    assert_redirected_to collected_characters_path
  end
end
