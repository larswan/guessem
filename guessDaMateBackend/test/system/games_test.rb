require "application_system_test_case"

class GamesTest < ApplicationSystemTestCase
  setup do
    @game = games(:one)
  end

  test "visiting the index" do
    visit games_url
    assert_selector "h1", text: "Games"
  end

  test "should create game" do
    visit games_url
    click_on "New game"

    check "Iinprogress" if @game.iinProgress
    fill_in "P1", with: @game.p1
    fill_in "P1cards", with: @game.p1Cards
    fill_in "P1secretcard", with: @game.p1SecretCard
    fill_in "P2", with: @game.p2
    fill_in "P2cards", with: @game.p2Cards
    fill_in "P2secretcard", with: @game.p2SecretCard
    fill_in "Whosturn", with: @game.whosTurn
    click_on "Create Game"

    assert_text "Game was successfully created"
    click_on "Back"
  end

  test "should update Game" do
    visit game_url(@game)
    click_on "Edit this game", match: :first

    check "Iinprogress" if @game.iinProgress
    fill_in "P1", with: @game.p1
    fill_in "P1cards", with: @game.p1Cards
    fill_in "P1secretcard", with: @game.p1SecretCard
    fill_in "P2", with: @game.p2
    fill_in "P2cards", with: @game.p2Cards
    fill_in "P2secretcard", with: @game.p2SecretCard
    fill_in "Whosturn", with: @game.whosTurn
    click_on "Update Game"

    assert_text "Game was successfully updated"
    click_on "Back"
  end

  test "should destroy Game" do
    visit game_url(@game)
    click_on "Destroy this game", match: :first

    assert_text "Game was successfully destroyed"
  end
end
