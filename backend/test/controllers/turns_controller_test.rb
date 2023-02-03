require "test_helper"

class TurnsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @turn = turns(:one)
  end

  test "should get index" do
    get turns_url, as: :json
    assert_response :success
  end

  test "should create turn" do
    assert_difference("Turn.count") do
      post turns_url, params: { turn: { active: @turn.active, answer: @turn.answer, flippedCards: @turn.flippedCards, gameId: @turn.gameId, playerId: @turn.playerId, question: @turn.question, turn: @turn.turn, winning: @turn.winning } }, as: :json
    end

    assert_response :created
  end

  test "should show turn" do
    get turn_url(@turn), as: :json
    assert_response :success
  end

  test "should update turn" do
    patch turn_url(@turn), params: { turn: { active: @turn.active, answer: @turn.answer, flippedCards: @turn.flippedCards, gameId: @turn.gameId, playerId: @turn.playerId, question: @turn.question, turn: @turn.turn, winning: @turn.winning } }, as: :json
    assert_response :success
  end

  test "should destroy turn" do
    assert_difference("Turn.count", -1) do
      delete turn_url(@turn), as: :json
    end

    assert_response :no_content
  end
end
