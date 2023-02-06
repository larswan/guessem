require "test_helper"

class FriendshipsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @friendship = friendships(:one)
  end

  test "should get index" do
    get friendships_url, as: :json
    assert_response :success
  end

  test "should create friendship" do
    assert_difference("Friendship.count") do
      post friendships_url, params: { friendship: { p1Id: @friendship.p1Id, p2Id: @friendship.p2Id } }, as: :json
    end

    assert_response :created
  end

  test "should show friendship" do
    get friendship_url(@friendship), as: :json
    assert_response :success
  end

  test "should update friendship" do
    patch friendship_url(@friendship), params: { friendship: { p1Id: @friendship.p1Id, p2Id: @friendship.p2Id } }, as: :json
    assert_response :success
  end

  test "should destroy friendship" do
    assert_difference("Friendship.count", -1) do
      delete friendship_url(@friendship), as: :json
    end

    assert_response :no_content
  end
end
