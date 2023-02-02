require "test_helper"

class GamesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @game = games(:one)
  end

  test "should get index" do
    get games_url
    assert_response :success
  end

  test "should get new" do
    get new_game_url
    assert_response :success
  end

  test "should create game" do
    assert_difference("Game.count") do
      post games_url, params: { game: { inProgress: @game.inProgress, p1: @game.p1, p1Cards: @game.p1Cards, p1SecretCard: @game.p1SecretCard, p2: @game.p2, p2Cards: @game.p2Cards, p2SecretCard: @game.p2SecretCard, whosTurn: @game.whosTurn } }
    end

    assert_redirected_to game_url(Game.last)
  end

  test "should show game" do
    get game_url(@game)
    assert_response :success
  end

  test "should get edit" do
    get edit_game_url(@game)
    assert_response :success
  end

  test "should update game" do
    patch game_url(@game), params: { game: { inProgress: @game.inProgress, p1: @game.p1, p1Cards: @game.p1Cards, p1SecretCard: @game.p1SecretCard, p2: @game.p2, p2Cards: @game.p2Cards, p2SecretCard: @game.p2SecretCard, whosTurn: @game.whosTurn } }
    assert_redirected_to game_url(@game)
  end

  test "should destroy game" do
    assert_difference("Game.count", -1) do
      delete game_url(@game)
    end

    assert_redirected_to games_url
  end
end
