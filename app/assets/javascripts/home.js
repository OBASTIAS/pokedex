$(document).ready(function() {
    function requestApi(pokemon){
        $.ajax({
            url: pokemon,
            context: document.body,
            method: 'GET',
            success: function(response){
                var n = 1
                response.results.forEach(function(info){
                    let details = `<div class='container col-md-4 pokemon'>
                    <div class="card mb-5 mt-5 pt-5 pb-5" style="width: 18rem;">
                    <div class="card-body">
                      <h1 class="card-title">${info.name}</h1>
                      <a id='enlace-${n}' href="#" url="${info.url}" class="btn btn-primary pokemodal">¡Quiero ver más de este pokémon!</a>
                    </div>
                  </div>
                  </div>`
                  $('#info').append(details)
                  n = n + 1
                })
                
                next_url = response.next
                back_url = response.previous
                if (back_url == null){
                    $('#btn_back').hide()
                } else {
                    $('#btn_back').show()
                }
                $('.pokemodal').click(function(e){
                    e.preventDefault();
                    let new_url = ($(this).attr('url'))
                    $.ajax({
                        url: new_url,
                        context: document.body,
                        method: 'GET',
                        beforeSend: function(){
                            $('.erase-before-send').empty()
                        },
                        success: function(response){
                            var pokeImage = response.sprites.front_default
                            var pokeImageBack = response.sprites.back_default
                            $("#pokeImage").attr("src", pokeImage)
                            $("#pokeImageBack").attr("src", pokeImageBack)
                            $('#url-pokemon-modal').html((response.species.name.charAt(0).toUpperCase() + response.species.name.substr(1).toLowerCase()))
                            response.abilities.forEach(function(abi){ 
                                $("#abilityPokemon").append("<li class='list-ability'>"+abi.ability.name.charAt(0).toUpperCase()+abi.ability.name.substr(1).toLowerCase()+"</li>")
                            })
                            response.types.forEach(function(tipo){
                                $("#typePokemon").append("<li>"+tipo.type.name.charAt(0).toUpperCase()+tipo.type.name.substr(1).toLowerCase()+"</pli")
                            })
                            response.moves.forEach(function(move, index){
                                if (index < 5) {
                                    $("#movePokemon").append("<li>"+move.move.name.charAt(0).toUpperCase()+move.move.name.substr(1).toLowerCase()+"</li>")
                                }
                            })
                            response.game_indices.forEach(function(index){
                                $("#generationPokemon").append("<li>"+index.version.name.charAt(0).toUpperCase()+index.version.name.substr(1).toLowerCase()+"</li>")
                            })

                        }
                    })
                    $('#myModal').modal('show')
                })
            }
        })
    }
  
    var back_url
    var next_url
    requestApi('https://pokeapi.co/api/v2/pokemon/');

    function activeButton (){
        $('#btn').click(function(){
            $('#info').empty('.pokemon')
            $('#pokeparagraph').remove()
            requestApi(next_url)
        });

        $('#btn_back').click(function(){
            $('#info').empty('.pokemon')
            $('#pokeparagraph').remove()
            requestApi(back_url)
        });
    };
    activeButton()
    

})