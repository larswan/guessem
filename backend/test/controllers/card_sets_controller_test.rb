require "test_helper"

class CardSetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @card_set = card_sets(:one)
  end

  test "should get index" do
    get card_sets_url, as: :json
    assert_response :success
  end

  test "should create card_set" do
    assert_difference("CardSet.count") do
      post card_sets_url, params: { card_set: { topicName: @card_set.topicName } }, as: :json
    end

    assert_response :created
  end

  test "should show card_set" do
    get card_set_url(@card_set), as: :json
    assert_response :success
  end

  test "should update card_set" do
    patch card_set_url(@card_set), params: { card_set: { topicName: @card_set.topicName } }, as: :json
    assert_response :success
  end

  test "should destroy card_set" do
    assert_difference("CardSet.count", -1) do
      delete card_set_url(@card_set), as: :json
    end

    assert_response :no_content
  end
end
